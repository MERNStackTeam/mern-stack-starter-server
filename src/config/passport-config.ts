// passport-config.ts
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import User, { UserDocument } from '../models/User'; // Import your user model

// Local Strategy
passport.use(
    new LocalStrategy(async (username: string, password: string, done: (error: any, user?: any, options?: any) => void) => {
        try {
            const user = await User.findOne({ username });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return done(null, false, { message: 'Invalid credentials' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);



// JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret_here',
};

passport.use(
    new JwtStrategy(jwtOptions, (payload: any, done) => {
        User.findById(payload.sub, (err: Error | null, user: UserDocument | null) => {
            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    })
);

passport.serializeUser((user: any, done) => {
    done(null, user.id); // Use user.id instead of user._id
});

passport.deserializeUser((id: string, done) => {
    User.findById(id, (err: Error | null, user: any) => {
        if (err) {
            return done(err, null);
        }
        return done(null, user);
    });
});

