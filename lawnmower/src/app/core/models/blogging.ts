import { Creativity, Fan, Imagination } from './currency';

export class Post {
    message: number = 0;
    video: number = 0;
    picture: number = 0;
    topic: number = 0;
}
export class Blogging {
    fans: Fan;
    creativity: Creativity = new Creativity();
    imagination: Imagination = new Imagination();
    adsRevenu: number = 0;
    post: Post = new Post();
}
