const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const passport=require('passport')

const Instructor=require('../models/Instructor-model')

// Passport configuration
passport.use(
    new LocalStrategy(
      { usernameField: 'username', passwordField: 'password' },
      async (username, password, done) => {
        try {
          const user = await Instructor.findOne({ username });
  
          if (!user || user.password !== password) {
            return done(null, false, { message: 'Invalid credentials' });
          }
  
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your-secret-key',
      },
      (jwtPayload, done) => {
        return done(null, jwtPayload.user);
      }
    )
  );

  async function register(req,res){
    try {
        const { name, username, password } = req.body;
    
        const existingUser = await Instructor.findOne({ username });

        if (existingUser) {
          return res.status(400).json({ error: 'Username already exists' });
        }
    
        const newUser = await Instructor.create({name,username,password})

        res.status(201).json( 'Registration successful' );

      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    console.log(error)  
    }
  }

  async function login(req,res){
    console.log(req.user)
    const token = jwt.sign({ user: { _id: req.user._id, isAdmin: req.user.isAdmin } }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
  }

  module.exports={register,login}




