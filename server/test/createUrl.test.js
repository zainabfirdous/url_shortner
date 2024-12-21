const {createUrl} = require('../controller/shortUrl')
const {shortUrl} = require('../models/url'); 

jest.mock('../crud/shortUrl', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
}));

jest.mock('nanoid', () => ({
    nanoid: jest.fn(),
}));

jest.mock('../constant', () => ({
    BASE_URL: 'http://localhost:3000',
}));

describe("creating a short-url", ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    it("created url successfully", async()=>{
       findOne.mockResolvedValue(null);
        
        const newShortUrl = {id:1, originalUrl: 'example.com/link/deeplink', shorturl:'example.com/short'}
        create.mockResolvedValue(newShortUrl)

        let req = {
            body : {
            longUrl:'example/link/deeplink/deeperlink',
            customAlias: 'short'
        }}
    
        const response = await createUrl(req);

        expect(response).toBe('http://localhost:3000/short')
        //expect(response.message).toBe("successfully created shortUrl");
    })

    it("longUrl already exists", async()=>{
        const existingShortUrl = {id:1, originalUrl: 'example.com/link/deeplink', shorturl:'example.com/short'}
        shortUrl.findAll.mockResolvedValue(existingShortUrl);

        const originalUrl = 'example/link/deeplink/deeperlink'
        const response = await createUrl(originalUrl)

        expect(response.status).toBe(200);
        expect(response.message).toBe("successfully created shortUrl");
        expect(shortUrl.create).not.toHaveBeenCalled();
    })
})