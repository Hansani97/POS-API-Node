import bcrypt from 'bcrypt';
import UserSchema from "../model/UserSchema.js";
import nodemailer from 'nodemailer';
import jsonwebtoken from 'jsonwebtoken';

const salt = 10;

const register = (req, resp) => {
    UserSchema.findOne({'email': req.body.email}).then(result => {
        if (result === null) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                if (err) {
                    return resp.status(500).json(err);
                }
                const user = new UserSchema({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: hash,
                    activeState: true
                });

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'whprabo@gmail.com',
                        pass: 'dhju dqwy sgca eqxu'
                    }
                });
                const mailOption = {
                    from: 'whprabo@gmail.com',
                    to: req.body.email,
                    subject: 'New Account Creation',
                    text: 'You have created your account...' +
                        'Don`t worry,it`s a test of my code..😁😁🥰'
                }
                transporter.sendMail(mailOption, function (error, info) {
                    if (error) {
                        return resp.status(500).json({'error': error})
                    } else {
                        user.save().then(() => {
                            return resp.status(201).json({'message': 'Saved!'});
                        }).catch(error => {
                            return resp.status(500).json(error);
                        });
                    }
                });
            })
        } else {
            return resp.status(409).json({'error': 'user already exists'})
        }
    })


}

const login = (req, resp) => {
    UserSchema.findOne({'email': req.body.email}).then(selectedUser => {
        if (selectedUser != null) {
            bcrypt.compare(req.body.password, selectedUser.password, function (err, result) {
                if (err) {
                    return resp.status(500).json({'message': 'Internal server error'})
                }
                if (result) {
                    const payload = {email: selectedUser.email};
                    const secretKey = process.env.SECRET_KEY;
                    const expiresIn = '24h';

                    const token = jsonwebtoken.sign(payload,secretKey,{expiresIn});
                    return resp.status(200).json(token)
                } else {
                    return resp.status(401).json({'message': 'password incorrect'})
                }

            });
        } else {
            return resp.status(404).json({'message': 'user not found'})
        }
    })
}


export default {register, login};