import { PrismaClient } from "./src/generated/prisma";

const client = new PrismaClient;

async function createPost(title: string, description: string, image: string, likesCount: number) {
    try{
        const post = await client.post.create(
            {
                data: {title: title, description:description, image:image, likesCount: likesCount}
            }
        )
        console.log(post)
    }catch{

    }
}
async function createTag(name: string) {
    try{
        const tag = await client.tag.create(
            {
                data: {name: name}
            }
        )
        console.log(tag)
    }catch{

    }
}

async function connectPostsToTags(postId:number, tagId: number) {
    try{
        const relation = await client.tagsOnPosts.create(
            {
                data: {postId: postId, tagId:tagId}
            }
        )
        console.log(relation)
    }catch{

    }
}

async function getPostById(postId:number){
    try{
        const post = await client.post.findUnique({
            where: {
                id: postId,
            }
        })
        console.log(post)
    } catch{

    }
}

createPost("superPost", "very cool post", "https://image.png", 1)
createTag("nature")
connectPostsToTags(1, 1)
getPostById(2)