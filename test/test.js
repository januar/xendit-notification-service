const app = require('../dist/index')
const request = require('supertest').agent(app.listen())

describe('Test Send Notification REST API', function () {
    describe('GET /virtual-account/notify/<uuid>', function () {

        it('should return json with success status', function (done) {
            request.get('/virtual-account/notify/487b48f4-db45-4007-a221-d28158223b94')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(() => {
                    done()
                })
        })
    })
})