$(document).ready(() => {
    // Display latest notifications in modal.
    $("#modal-button").click(() => {
        $(".modal-body").html('');
        $.get(`/api/notifications`, (results = {}) => {
            let data = results.data;
            if (!data || !data.notifications) return;
            data.notifications.forEach((notification) => {
                $(".modal-body").append(
                    `<div>
                        <h6 class="notification-user">
                            ${notification.user.name.first} ${notification.user.name.last} posted:
                        </h6>
                        <div class="notification-content">
                            ${notification.content}
                        </div>
                        <hr/>
                    </div>`
                );
            });
        });
    });
    // Display users with follow/unfollow button.
    $.get(`/api/users`, (results = {}) => {
        let data = results.data;
        if (!data || !data.users) return;
        data.users.forEach((user) => {
            $(".usersDiv").append(
                `<div>
                    <a href="/users/${user._id}">${user.name.first} ${user.name.last}</a>
                    <button class="follow-button ${user.following ? 'following' : 'notFollowing'}" data-id="${user._id}">
                    ${user.following ? "Unfollow" : "Follow"}
                    </button>
                </div>`
            );
        });
    })
    .then(() => {
        addFollowButtonListener();
    });
    // Display posts with delete button.
    $.get(`/api/posts`, (results = {}) => {
        let data = results.data;
        if (!data || !data.posts) return;
        data.posts.forEach((post) => {
            $(".postsDiv").append(
                `<a href="/users/${post.user._id}">${post.user.userName} (${post.user.name.first} ${post.user.name.last})</a>
                <div class="border rounded post">
                    <p>${post.content}</p>                           
                </div>`
            )
            if (post.userPost) {
                $(".postsDiv").append(
                    `<p>
                        <a href="/posts/${post._id}/delete?_method=DELETE" class="btn btn-secondary btn-md active" role="button" aria-pressed="true">Delete</a>
                    </p>`
                );
            }
        });
    });
    // Update top 10 hashtags every minute.
    getTrendingHashtags();
    setInterval(getTrendingHashtags, 1000 * 60);
});

let addFollowButtonListener = () => {
    $(".follow-button").click((event) => {
        let $button = $(event.target),
            userId = $button.data("id");

        if ($button.hasClass('notFollowing')) {
            $.get(`/api/users/${userId}/follow`, (results = {}) => {
                let data = results.data;
                if (data && data.success) {
                    $button
                        .text("Unfollow")
                        .addClass("following")
                        .removeClass("notFollowing");
                } else {
                    $button.text("Try again");
                }
            });
        } else {
            $.get(`/api/users/${userId}/unfollow`, (results = {}) => {
                let data = results.data;
                if (data && data.success) {
                    $button
                        .text("Follow")
                        .addClass("notFollowing")
                        .removeClass("following");
                } else {
                    $button.text("Try again");
                }
            });
        }
    });
};

let getTrendingHashtags = () => {
    $(".hashtagsUl").html('');
    $.get(`/api/hashtags`, (results = {}) => {
        let data = results.data;
        if (!data || !data.hashtags) return;
        data.hashtags.forEach((hashtag) => {
            $(".hashtagsUl").append(
                `<li>${hashtag.name}</li>`
            )
        });
    });
};