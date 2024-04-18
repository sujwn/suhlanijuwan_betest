const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, before, beforeEach, afterEach } = require('mocha');
const app = require('../src/index');
const User = require('../src/models/user');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
    let authToken;
    let userId;

    before(async () => {
        // Create a user for testing
        const user = new User({
            userName: 'admin',
            accountNumber: '00000000000',
            emailAddress: 'admin@example.com',
            identityNumber: '00000000000'
        });
        await user.save();
        
        // Perform login and get JWT token
        const loginRes = await chai.request(app)
            .post('/api/auth/login')
            .send({ userName: 'admin', accountNumber: '00000000000' });

        authToken = loginRes.body.token;
    });

    beforeEach(async () => {
        // Create a user for testing
        const user = new User({
            userName: 'Test User',
            accountNumber: '123456789',
            emailAddress: 'test@example.com',
            identityNumber: '1234567890'
        });
        const newUser = await user.save();
        userId = newUser._id;
    });

    afterEach(async () => {
        if (userId) {
            // Clean up test data by deleting the user with the specific userId
            await User.findByIdAndDelete(userId);
            userId = null; // Reset userIdToDelete after deletion
        }
    });
    

    it('should return status 200 for GET /users', (done) => {
        chai.request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.an('array');
                done();
            });
    });

    it('should return status 200 and user object for GET /api/users/account/:accountNumber', (done) => {
        chai.request(app)
            .get('/api/users/account/123456789')
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.accountNumber).to.equal('123456789');
                done();
            });
    });

    it('should return status 200 and user object for GET /api/users/identity/:identityNumber', (done) => {
        chai.request(app)
            .get('/api/users/identity/1234567890')
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.identityNumber).to.equal('1234567890');
                done();
            });
    });

    it('should return status 201 and created user object for POST /api/users', (done) => {
        chai.request(app)
            .post('/api/users')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                userName: 'New User',
                accountNumber: '987654321',
                emailAddress: 'newuser@example.com',
                identityNumber: '0987654321'
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body.userName).to.equal('New User');
                done();
            });
    });

    it('should return status 200 and updated user object for PATCH /api/users/:id', (done) => {
        chai.request(app)
            .patch(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ userName: 'Updated User' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.userName).to.equal('Updated User');
                done();
            });
    });

    it('should return status 200 for DELETE /api/users/:id', (done) => {
        chai.request(app)
            .delete(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    after(async () => {
        // Clean up test data
        await User.deleteMany();
    });
});
