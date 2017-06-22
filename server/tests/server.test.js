const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../models/todo');
const {app} = require('./../server');

describe('POST /todo', () => {
    it('Should create a new todo',(done)=>{
        var text = 'Test todo text';
        request(app)
            .post('/todo')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text)
            })
            .end((err,res)=>{
            if(err){
                return done(err)
            }
                done();
            })
    });
});