import Icons from './icons';

import { getYouTubeLinkFromSpotifySong, getCommentsFromYouTubeLink, YoutubeComment, YoutubeReply } from './api/Youtube';
import PageView from './pages/PageView';

let commentsPage = new PageView()

let commentsButton = new Spicetify.Playbar.Button(
    "Song Comments",
    Icons.CommentsPlaybarButton,
    (self: Spicetify.Playbar.Button) => {
        if (self.active) {
            self.active = false;
            commentsPage.Close();
        }
        else {
            self.active = true;
            commentsPage.Open();
        }
    },
    false,
    false,
)


Spicetify.Platform.History.listen((location: Location) => {
    if (location.pathname.startsWith("/comments")) {
        // commentsPage.Open()
        commentsButton.active = true;
        commentsPage.Render();
    }
    else {
        commentsButton.active = false;
        document.getElementById("comments-view")?.remove()

        // commentsPage.Close()
    }
}
)


async function main() {
    while (!Spicetify?.showNotification || !Spicetify.Player?.data?.item.uri) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    commentsButton.register();
    // onSongChange(); // Check if there is a song playing when the script is loaded
}

export default main;
