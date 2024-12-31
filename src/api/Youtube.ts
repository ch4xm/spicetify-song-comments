
export interface YoutubeComment {
    content: string
    likes: number
    date: Date
    replies: YoutubeReply[]
}

export interface YoutubeReply {
    content: string
    likes: number
    date: Date
}

export async function getYouTubeLinkFromSpotifySong(id: string): Promise<string> {
    return 'https://www.youtube.com/watch?v=YTH8cxXBGBo'    // This is a placeholder
}

export async function getCommentsFromYouTubeLink(link: string): Promise<YoutubeComment[]> {
    return [
        {
            content: 'This is a comment',
            likes: 56,
            date: new Date(),
            replies: [
                {
                    content: 'This is a reply',
                    likes: 2,
                    date: new Date()
                },
                {
                    content: 'This is another reply',
                    likes: 1,
                    date: new Date()
                }
            ]
        },
        {
            content: 'This is another comment',
            likes: 12,
            date: new Date(),
            replies: [
                {
                    content: 'This is a reply',
                    likes: 2,
                    date: new Date()
                },
                {
                    content: 'This is another reply',
                    likes: 1,
                    date: new Date()
                },
                {
                    content: 'Yet another reply',
                    likes: 1,
                    date: new Date()
                },
            ]
        }
    ]
}

