class Currency {
    amount: number = 0;
    gain: number = 0;
}

class Fan extends Currency {
    gainChance: number = 0;
}

class Creativity extends Currency {}
class Imagination extends Currency {}

class Post {
    message: number;
    video: number;
    picture: number;
    topic: number;
}
export class Blogging {
    fans: Fan;
    creativity: Creativity;
    imagination: Imagination;
    adsRevenu: number = 0;
    post: Post;
}
