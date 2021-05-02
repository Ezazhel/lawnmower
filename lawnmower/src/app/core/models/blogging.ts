import { Fan } from './Currencies';

export class Post {
    message: number = 0;
    video: number = 0;
    picture: number = 0;
    topic: number = 0;
}
export class Blogging {
    fans: Fan;
    adsRevenu: number = 0;
    post: Post = new Post();
}
