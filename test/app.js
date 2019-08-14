'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const app = require('../src/app');

chai.use(chaiHttp);
chai.should();

describe('Sending GitHub notifications', () => {
    context('without an action in body', () => {
        it('should ignore notification', (done) => {
            chai.request(app)
                .post('/')
                .send({})
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.text).to.be.a('string').and.satisfy(msg => msg.startsWith("Notification ignored"));
                    done();
                });
        });
    });

    context('with an unsupported action in body', () => {
        it('should ignore notification', (done) => {
            chai.request(app)
                .post('/')
                .send({"action": "opened"})
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.text).to.be.a('string').and.satisfy(msg => msg.startsWith("Notification ignored"));
                    done();
                });
        });
    });

    context('with a badly formatted review request', () => {
        it('should return a bad request', (done) => {
            chai.request(app)
                .post('/')
                .send({"action": "review_requested"})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});

