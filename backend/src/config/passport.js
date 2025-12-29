const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Only initialize Google Strategy if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  // Construct full callback URL
  // Priority: GOOGLE_CALLBACK_URL > BACKEND_URL > relative path
  let callbackURL = process.env.GOOGLE_CALLBACK_URL;
  
  if (!callbackURL) {
    if (process.env.BACKEND_URL) {
      callbackURL = `${process.env.BACKEND_URL.replace(/\/+$/, '')}/api/auth/google/callback`;
    } else {
      // Use relative path - Passport will construct full URL from request
      callbackURL = "/api/auth/google/callback";
    }
  }
  
  console.log('✓ Google OAuth callback URL:', callbackURL);

  const googleStrategy = new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL,
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.emails || !profile.emails[0] || !profile.emails[0].value) {
          return done(new Error('No email found in Google profile'), null);
        }

        const email = profile.emails[0].value.toLowerCase();
        
        // Check if user exists by email
        let user = await User.findOne({ email });

        if (!user) {
          // Generate a unique username from email or name
          const baseUsername = profile.displayName
            ? profile.displayName.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 15)
            : email.split('@')[0].substring(0, 15);
          
          let username = baseUsername;
          let counter = 1;
          
          // Ensure username is unique
          while (await User.findOne({ username })) {
            username = `${baseUsername}${counter}`;
            counter++;
          }

          // Create new user if doesn't exist
          user = await User.create({
            name: profile.displayName || email.split('@')[0],
            email: email,
            username: username,
            isEmailVerified: true,
            googleId: profile.id,
            avatar: profile.photos?.[0]?.value || ''
          });
        } else {
          // Update existing user with Google ID if not already set
          if (!user.googleId) {
            user.googleId = profile.id;
            user.isEmailVerified = true;
            if (!user.avatar && profile.photos?.[0]?.value) {
              user.avatar = profile.photos[0].value;
            }
            await user.save();
          }
        }

        return done(null, user);
      } catch (error) {
        console.error('Google OAuth error:', error);
        return done(error, null);
      }
    }
  );

  passport.use(googleStrategy);
} else {
  console.warn('⚠ Google OAuth credentials not found. Google login will not be available.');
}

// Serialize user into the sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the sessions
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;