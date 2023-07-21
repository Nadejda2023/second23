"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../../src");
const db_1 = require("../../src/db/db");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(src_1.app)
        .delete('/all-data')
        .set("Authorization", "Basic YWRtaW46cXdlcnR5");
}));
/*describe('/blogs',() => {
    beforeAll(async () => {
        authorizationValidation
})*/
describe('/blogs', () => {
    it('should return 200 and blogs array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs')
            .expect(200, db_1.db.blogs);
    }));
    const createdBlogs = null;
    it('should return 404 for not existing blogs', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs/66666')
            .expect(404);
    }));
    it('should dont create blogs with not correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { id: '',
            name: '',
            description: '',
            websiteUrl: '' };
        const createdBlogs = yield (0, supertest_1.default)(src_1.app)
            .post('/blogs')
            .send(data)
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .expect(400);
    }));
});
// })
