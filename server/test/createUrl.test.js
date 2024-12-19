const createUrl = require("../../service/shortUrl")

jest.mock("../../crud")

describe("creating a short-url", ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    it("created url successfully", async()=>{
        shortUrl.findAll.mockResolveValue([]);
        
        const newShortUrl = {id:1, originalUrl: 'example.com/link/deeplink', shorturl:'example.com/short'}
        shortUrl.create.mockResolveValue(newShortUrl)

        const originalUrl = 'example/link/deeplink/deeperlink'
        const response = await createUrl(originalUrl);

        expect(response.status).toBe(200);
        expect(response.message).toBe("successfully created shortUrl");
    })

    it("longUrl already exists", async()=>{
        const existingShortUrl = {id:1, originalUrl: 'example.com/link/deeplink', shorturl:'example.com/short'}
        shortUrl.findAll.mockResolveValue(existingShortUrl);

        const originalUrl = 'example/link/deeplink/deeperlink'
        const response = await createUrl(originalUrl)

        expect(response.status).toBe(200);
        expect(response.message).toBe("successfully created shortUrl");
        expect(shortUrl.create).not.toHaveBeenCalled();
    })
})