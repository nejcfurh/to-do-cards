import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
import FacebookStrategy from 'passport-facebook';
import TwitterStrategy from 'passport-twitter';
import GitHubStrategy from 'passport-github2';
import { User } from '../index.js';

const dailyList = {
  name: 'Daily',
  url: 'https://images.unsplash.com/photo-1506485338023-6ce5f36692df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  body: 'Daily tasks!',
};

// GOOGLE STRATEGY

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        'https://to-do-cards-server.vercel.app/auth/google/todocards',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            lists: [dailyList],
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// FACEBOOK STRATEGY

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:
        'https://to-do-cards-server.vercel.app/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            facebookId: profile.id,
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            email: profile.emails[0].value,
            lists: [dailyList],
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// TWITTER X STRATEGY

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_APP_KEY,
      consumerSecret: process.env.TWITTER_APP_SECRET,
      callbackURL:
        'https://to-do-cards-server.vercel.app/auth/twitter/callback',
      includeEmail: true,
    },
    async (token, tokenSecret, profile, done) => {
      try {
        let user = await User.findOne({ twitterXId: profile.id });
        if (!user) {
          user = await User.create({
            twitterXId: profile.id,
            name: profile.displayName,
            email: profile.username + '@Twitter/X',
            lists: [dailyList],
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

//GITHUB STRATEGY

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'https://to-do-cards-server.vercel.app/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ gitHubId: profile.id });
        if (!user) {
          user = await User.create({
            gitHubId: profile.id,
            name: profile.username,
            email: profile.username + '@GitHub',
            password: null,
            lists: [dailyList],
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
