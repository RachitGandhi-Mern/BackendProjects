// Import the Pinecone library
const { Pinecone } = require('@pinecone-database/pinecone')

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.YOUR_API_KEY });

// Create a dense index with integrated embedding
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


