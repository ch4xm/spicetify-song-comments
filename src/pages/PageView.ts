import { YoutubeComment } from "../api/Youtube";

const commentsPageCSS = `
    #comments-view {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        background-color: gray;
        flex-direction: row;
    }

    #close-comments-button {
        width: 60px;
        height: 60px;
        background-color: black;
        opacity: 0.6;
        display: flex;
        border-radius: 50px;
        border: none;
        position: absolute;
        top: 5%;
        color: white;
        justify-content: center;
        align-items: center;
        text-align: center;
        vertical-align: middle;
        font-size: 25px;
        transition: 0.25s ease-in-out;
    }
    #close-comments-button:hover {
        opacity: 0.35;
    }
`

export default class PageView {
    private comments: YoutubeComment[] = [];
    public lastPage: Location | undefined;

    constructor() {
        this.comments = [];
    }

    public createCommentsHTML() {
        
        return `
            <div class="comments">
            {""
                ${this.comments.length === 0 ? "No comments" : 
                    this.comments.map(comment => `
                        <div class="comment">
                            <div class="content">${
                                comment.content
                            }</div>
                            <div class="likes">${
                                comment.likes
                            }</div>
                            <div class="date">${
                                comment.date
                            }</div>
                            
                            <div class="replies">
                                ${comment.replies.map(reply => `
                                    <div class="reply">
                                        <div class="content">${
                                            reply.content
                                        }</div>
                                        <div class="likes">${
                                            reply.likes
                                        }</div>
                                        <div class="date">${
                                            reply.date
                                        }</div>
                                    </div>
                                `).join('')}

                            </div>
                        </div>
                `).join('')}
            </div>
        `;
    }

    public updateComments(comments: YoutubeComment[]) {
        this.comments = comments;
    }

    public async Render() {
        // Register the component to the DOM
        
        while (!document.querySelector('.Root__main-view')) {   // Wait for the main view to load
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        let mainView = document.querySelector('.Root__main-view') as HTMLElement;

        let style = document.createElement("style");
        style.innerHTML = commentsPageCSS;
        document.head.appendChild(style);
        
        if (!document.getElementById("comments-view")) {

            let commentsView = document.createElement("div");
            commentsView.id = "comments-view";
            commentsView.innerHTML = this.createCommentsHTML();

            let closeButton = document.createElement("button");
            closeButton.id = "close-comments-button";
            closeButton.innerHTML = "&#10006";
            
            closeButton.onclick = () => {
                this.Close();
            }
             
            commentsView.appendChild(closeButton);
            mainView.appendChild(commentsView);
        }
    }

    public Open() {
        const location = Spicetify.Platform.History.location
        if (location !== undefined && location.pathname.startsWith('/comments') === false) {
            this.lastPage = location;
        }
        Spicetify.Platform.History.push('/comments');
    }

    public Close() {
        document.getElementById("comments-view")?.remove()
        if (this.lastPage !== undefined && this.lastPage.pathname.startsWith('/comments') === false) {
            return Spicetify.Platform.History.push(this.lastPage);
        }
        Spicetify.Platform.History.push('/');
    }
}

