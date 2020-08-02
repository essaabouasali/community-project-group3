process.env.NODE_ENV = 'test';

const storage = require('node-persist');

let chai = require('chai');
let chaiHttp =require('chai-http');
let server = require('../index');
const expect  = chai.expect;
let should = chai.should();
// let projects=[];

chai.use(chaiHttp);

describe('test projects env',()=>{


    describe('/Get the projects',()=>{
        it("it should get all the projects",(done)=>{
            chai.request(server)
            .get('/projects')
            .end((err,res)=>{
                    res.body.should.have.status(200);
                    res.body.data.should.be.a('array');

                done();
            });
        });

        it("it should get the name not number",(done)=>{
            chai.request(server)
            .get('/projects')
            .end((err,res)=>{
                res.body.data.map(e => e.value.nameofsubmitter.should.be.a('string'));
                done();
            })
        });
    });

    describe('/test POST METHOD',()=>{
        it("it should not do the post if we don't have postcode",(done)=>{
            let project={
                nameofsubmitter:"mariam",
                title:"project 3",
                description:" dapibus augue imperdiet.",
                postcode:"",
                email:"sample@sample.com"
            }

            chai.request(server)
            .post("/projects")
            .send(project)
            .end((err,res)=>{
                res.body.should.have.status(500);
                done();
            });
        });
        it("it should not do the post if the name is number",(done)=>{
            let project={
                nameofsubmitter:"3434",
                title:"project 3",
                description:" dapibus augue imperdiet.",
                postcode:"2000",
                email:"sample@sample.com"
            }

            chai.request(server)
            .post("/projects")
            .send(project)
            .end((err,res)=>{
                res.body.should.have.status(500);
                done();
            });
        });

        it("it should not do the post if the name is empty",(done)=>{
            let project={
                nameofsubmitter:"",
                title:"project 3",
                description:" dapibus augue imperdiet.",
                postcode:"2000",
                email:"sample@sample.com"
            }

            chai.request(server)
            .post("/projects")
            .send(project)
            .end((err,res)=>{
                res.body.should.have.status(500);
                done();
            });
        });

        it("it should not do the post if the description is empty",(done)=>{
            let project={
                nameofsubmitter:"essa",
                title:"project 3",
                description:"",
                postcode:"2000",
                email:"sample@sample.com"
            }

            chai.request(server)
            .post("/projects")
            .send(project)
            .end((err,res)=>{
                res.body.should.have.status(500);
                done();
            });
        });

        it("it should not do the post if the title is empty",(done)=>{
            let project={
                nameofsubmitter:"essa",
                title:"",
                description:"nasodasod",
                postcode:"2000",
                email:"sample@sample.com"
            }
            chai.request(server)
            .post("/projects")
            .send(project)
            .end((err,res)=>{
                res.body.should.have.status(500);
                done();
            });
        });

        it("it should not do the post if we don't have postcode",(done)=>{
            let project={
                nameofsubmitter:"essa",
                title:"sadas",
                description:"nasodasod",
                email:"sample@sample.com"
            }
            chai.request(server)
            .post("/projects")
            .send(project)
            .end((err,res)=>{
                res.body.should.have.status(500);
                done();
            });
        });
    });

    describe('test put methode',()=>{
        it("should not do update if the status field not exist",(done)=>{
            let data={
                id:"b8398437-9b6e-4651-a7e3-251a1f0e7efc"
            }

            chai.request(server)
            .put('/projects')
            .send(data)
            .end((err,res)=>{
                res.body.should.have.status(500);
                done();
            })
        })
        it("should not do update if the ID field not exist",(done)=>{
            let data={
                status:"approved"
            }
            chai.request(server)
            .put('/projects')
            .send(data)
            .end((err,res)=>{
                res.body.should.have.status(500);
                done();
            })
        })
    });
    describe("test comments ",()=>{
        it("should add comments to the array",(done)=>{
            let data={
                comment:"comment"
            }
            chai.request(server)
            .put('/approved-projects/comments/')
            .send(data)
            .end((err,res)=>{
                res.body.should.have.status(200);
                res.body.data.comments.should.be.a('array');
                done();
            })
        })
        it("should not do the put if the comment is empty",(done)=>{
            let data={
                comment:""
            }
            chai.request(server)
            .put('/approved-projects/comments/')
            .send(data)
            .end((err,res)=>{
                res.body.should.have.status(500);
                done();
            })
        })
    });
});



