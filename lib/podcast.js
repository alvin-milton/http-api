
const Podcast = require("Podcast");
const _data = require("./data");

const podcast = {};
podcast.readPodcast = function (data, callback) {
    const feedOptions = {
        title: 'title',
        description: 'description',
        feed_url: 'http://example.com/rss.xml',
        site_url: 'http://example.com',
        image_url: 'http://example.com/icon.png',
        docs: 'http://example.com/rss/docs.html',
        author: 'Dylan Greene',
        managingEditor: 'Dylan Greene',
        webMaster: 'Dylan Greene',
        copyright: '2013 Dylan Greene',
        language: 'en',
        categories: ['Category 1', 'Category 2', 'Category 3'],
        pubDate: 'May 20, 2012 04:00:00 GMT',
        ttl: '60',
        itunesAuthor: 'Max Nowack',
        itunesSubtitle: 'I am a sub title',
        itunesSummary: 'I am a summary',
        itunesOwner: { name: 'Max Nowack', email: 'max@unsou.de' },
        itunesExplicit: false,
        itunesCategory: {
            "text": "Entertainment",
            "subcats": [{
                "text": "Television"
            }]
        },
        itunesImage: 'http://link.to/image.png'
    }
    const feed = new Podcast(feedOptions);
    _data.read('./data', 'base', function () {
        console.log('executed')
    })
    return feed;
    // const xml = feed.buildXml();
};
module.exports = podcast;