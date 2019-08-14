'use strict';

const cards = require('../src/cards');
const expect = require('chai').expect;

describe('Generating MS Teams card for review request', function () {

    context('without payload', function () {
        it('should return undefined', function () {
            expect(cards.generateReviewRequestedCard({})).to.be.undefined
        })
    });

    context('without requested reviewer in payload', function () {
        it('should return undefined', function () {
            expect(cards.generateReviewRequestedCard(
                {
                    "action": "opened",
                    "number": 1234,
                    "pull_request": {
                        "id": 1234455435,
                    },
                    "repository": {
                        "id": 123,
                    }
                }
            )).to.be.undefined
        });
    });

    context('with valid payload', function () {
        it('should return a valid card object', function () {
            expect(cards.generateReviewRequestedCard(
                {
                    "action": "review_requested",
                    "pull_request": {
                        "title": "Improved readme with component features",
                        "_links": {
                            "html": {
                                "href": "https://git.domain.com/organization/myrepo/pull/22"
                            }
                        },
                        "additions": 9,
                        "deletions": 0,
                        "changed_files": 1
                    },
                    "requested_reviewer": {
                        "login": "bill-gates"
                    },
                    "repository": {
                        "name": "MyRepo"
                    },
                    "sender": {
                        "login": "steve-jobs",
                        "avatar_url": "https://www.apple.com"
                    }
                }
            )).to.have.keys('@type', '@context', 'summary', 'themeColor', 'title', 'sections', 'potentialAction')
        });
    });

});

describe('Formatting login to pretty printed name', function () {

    context('with empty login', function () {
        it('should return empty string', function () {
            expect(cards.prettyPrintLogin("")).to.equal("")
        })
    });

    context('with single username', function () {
        it('should return username with first char in uppercase', function () {
            expect(cards.prettyPrintLogin("user")).to.equal("User")
        });
    });

    context('with an AD username', function () {
        it('should return username with first char in uppercase', function () {
            expect(cards.prettyPrintLogin("firstname-lastname")).to.equal("Firstname Lastname")
        });
    });

});
