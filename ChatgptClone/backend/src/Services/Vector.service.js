
const { Pinecone } = require('@pinecone-database/pinecone')


const pc = new Pinecone({ apiKey: process.env.YOUR_API_KEY });


const GptCloneIndex = pc.Index("chatgpt-clone")

exports.createMemoryVector = async({vector , metadata , messageId}) => {
    await GptCloneIndex.upsert([{
        values:vector,
        id: messageId,
        metadata
    }])
}

exports.queryMemoryVector = async ({queryVector , limit=5 , metadata}) => {
    const data = await GptCloneIndex.query({
        vector:queryVector,
        topK:limit,
        filter:metadata,
        includeMetadata:true
    })
    return data.matches
}


