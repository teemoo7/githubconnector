'use strict';

module.exports.prettyPrintLogin = prettyPrintLogin;
module.exports.generateReviewRequestedCard = function (payload) {
    if (payload.pull_request && payload.requested_reviewer && payload.sender && payload.repository) {
        let title = payload.pull_request.title;
        let sender = prettyPrintLogin(payload.sender.login);
        let senderAvatarUrl = payload.sender.avatar_url;
        let reviewer = prettyPrintLogin(payload.requested_reviewer.login);
        let additions = payload.pull_request.additions;
        let deletions = payload.pull_request.deletions;
        let changedFiles = payload.pull_request.changed_files;
        let url = payload.pull_request._links.html.href;
        let repository = payload.repository.name;
        return {
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "summary": reviewer + " - Review requested",
            "themeColor": "0078D7",
            "title": "Review requested: " + title,
            "sections": [
                {
                    "activityTitle": reviewer,
                    "activitySubtitle": "",
                    "activityImage": senderAvatarUrl,
                    "facts": [
                        {
                            "name": "Pull request:",
                            "value": url
                        },
                        {
                            "name": "Developer:",
                            "value": sender
                        },
                        {
                            "name": "Reviewer:",
                            "value": reviewer
                        },
                        {
                            "name": "Repository:",
                            "value": repository
                        },
                        {
                            "name": "Stats:",
                            "value": additions + " additions, " + deletions + " deletions, " + changedFiles + " changed files"
                        }
                    ],
                    "text": sender + " has requested a review from " + reviewer + "."
                }
            ],
            "potentialAction": [
                {
                    "@type": "OpenUri",
                    "name": "Show PR on GitHub",
                    "targets": [
                        {"os": "default", "uri": url}
                    ]
                }
            ]
        };
    }
};

function prettyPrintLogin (login) {
    return login.replace('-', ' ').toLowerCase().replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
        return letter.toUpperCase();
    })
}
