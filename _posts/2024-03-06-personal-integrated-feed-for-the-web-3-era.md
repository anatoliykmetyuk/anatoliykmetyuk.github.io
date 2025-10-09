---
title: Healthy News Consumption in the Era of Web 2
layout: post
---
Being exposed to unbiased, relevant, high-quality news can open the door to professional opportunities, learning, quality personal time. How do we consume news and other content in this day and age? It is mainly via personalized feeds of social networks and notifications they send us.

There are a few problems with this approach:

- **Isolation.** The feeds are isolated one from another. You can't merge your YouTube and Instagram feed into one, for example - even if they are close by meaning.
- **The Algorithm.** Most modern social media algorithms tend to feed you more of what you already engaged with. For example, YouTube's algorithm doesn't show you the content from all the channels you follow. Who you follow is merely one of the inputs to the algorithm that determines what to show.
- **Echo Chambers.** They are the direct consequence of the algorithm that feeds you more of what you already engaged with. Being in an echo chamber leads to having a distorted view of the world, losing touch with reality, and bad decisions as a consequence.
- **Data privacy.** Platforms get to know you, then sell your profile to advertisers, which then tailor their engagement strategies to you specifically. This means, your online behavior has consequences you can't necessarily foresee or control, even if you're only reading and never publishing content yourself.

To better understand the current state of online information, its possible future, and what you can do today to consume information in a healthy way, let's look at how the Internet evolved over time.

# The Timeline of the Internet


## Web 1 - 1990s - mid 2000s

This is the early Internet, from its very beginnings and until the first social networks. It consisted of servers which had content on them, and users who could access that content. Those users, however, had limited ability to publish content themselves.

For example, your main source of news could be a news website, which was a digital replica of an ordinary newspaper. There's a team of editors and reporters who decide the agenda and prepare the publications.

## Web 2 - mid 2000s - now

This is the Internet in the era of the social media. As before we have servers which host content, but now, the teams managing servers aren't the ones publishing new content - their users to it for them. YouTube, Facebook, TikTok etc - it's the users who produce the content there. "Liking", "Sharing", "Following", "Tagging" and other tools for user-driven content propagation appear. They lead to new online social dynamics, for example, the phenomenon of "going viral".

Imagine you want to start a news outlet in the Web 1 era. You'd have to assemble a team to open and maintain a dedicated website. In the Web 2 era, you can do it in under 5 minutes by starting a new channel on your social media of choice.

The drawback of Web 2 is centralization: your data is stored on a server that you don't have control over. There are legislative efforts being made, especially in the EU, to return the people control over their data and flatten the power imbalance between a corporation and a single person. However, if the legal possibility for data abuse is eliminated but the technical possibility for such an abuse remains - the power imbalance is not really flattened, as laws may be breached.

## Web 3

This term started to pick up in popularity in mid-2010s in the cryptocurrencies and blockchain community. It represents a vision for the Internet that retains the user-driven aspect of Web 2 - but where you own your data and your content, technically as much as legally. The key concepts of Web 3 are:

- **Decentralization** - public platforms like Facebook become collectively owned rather than owned by a single corporation.
- **Identity and Ownership as first-class citizens** - meaning, you don't need Google to provide you with an online identity, online identity becomes a part of the Internet itself. You don't need a government to hold a record of you owning a house - the notion of ownership is built upon the identity and also becomes baked in to the fabric of the Internet.

An example of decentralization is Mastodon. The recent turbulences with Twitter caused many in the tech world to move to Mastodon. Mastodon is a fediverse - a decentralized social network made of independent, sovereign servers ran by individual users. Anyone can start their own Mastodon server, set their own rules, admit who they like - and their server will be interoperable with other people's servers.

An example of ownership and identity as first-class citizens is blockchain. The vision is a world where you don't need a 3rd party to grant you an identity (the government issuing you a passport with which you can travel) or attest to you owning something (a bank attesting that you hold $X in your account, an entry on a game server database confirming you own a precious item).

The above may sound like science fiction but is doable via clever math, cryptography and algorithms. I won't go into details in this article - the tech may change, but the vision stays the same.

At the moment, we are far from the Web 3 vision, especially as the blockchain world had an unfortunate start tarnishing its reputation in various criminal schemes and large hacks. However, we can use the vision as our guiding star to make small, informed steps towards it with currently available technology.

To explore the technology that makes it possible to self-curate your news feed, and, in perspective, to own your data as per Web 3 principles, let's look at RSS.

# RSS

RSS is a content consumption technology that matured back in 2002, in the era of Web 1. Contrary to Web 2 way, which forces you to log in to a proprietary platform to access its feed in a way controlled by the platform, RSS is an open standard of news consumption.

Technically-speaking, websites that support RSS expose all their latest news in a form of a special file that is available via a URL and is updated regularly. RSS software regularly checks that file for new content and presents it to the user. The format of the file is open, meaning anyone can implement their own RSS reader.

RSS presents a viable alternative to modern-day feeds as it allows you to determine by yourself what you see. You are no longer restricted to viewing only one platform at a time - you can view several platforms in a single feed. Also, there is no algorithm in RSS: the content is presented in the order it was published.

In the modern day RSS is not as popular as it used to be - less and less services expose their content as RSS feeds. However, there's a large community of RSS enthusiasts that creates robust bridges - RSS interfaces to populare services. With such bridges, you can consume a feed from a user or topic of a social network or a news website as an RSS feed.

**Disclaimer:** it's important to check the websites' terms of services before deciding to use an RSS bridge to them. It's important to understand that many social network's business model relies on their ability to control the information you see (to keep you longer there, to show you more ads). While some bridges rely on an official API of a service, some others rely on web scraping which may already violate some websites' ToS.

# The Setup

To read RSS, we'll need two apps: FreshRSS and RSSHub.

FreshRSS is an RSS client that you can use to subscribe to various feeds. RSS feeds and YouTube channels are supported out of the box. To start using it, create an account with any of the free instances. Then, use the instance to subscribe to YouTube channels or RSS feeds.

For the websites that do not support RSS out of the box, you can use RSSHub to still access them from FreshRSS. RSSHub Radar is a browser extension that can be used to subscribe to websites supported by RSSHub from the browser.

RSSHub's community is massive, and they provide bridges to literally everything. As mentioned before, be careful to comply with the ToS of a service you're bridging to, as not all for all of them such RSS bridging will be legal.

# Going Web 3

In its docs, RSSHub points to a demo instance to generate feeds. It's fine for simple use cases, but you may find that you need a custom configuration. The best way to use RSSHub and FreshRSS is by deploying a custom, self-hosted instance on your own server. This way, you gain control over your data and can configure your software the way you want, in spirit of Web 3.

Fortunately, in this day and age, spinning your own server is not as scary to do as it sounds. There are entire operating systems, such as CasaOS, which you can install on your own server and use to install and manage FreshRSS, RSSHub and other apps on that server - just like you would use iOS on your iPhone to access App Store and install apps.


# Conclusion

We are living in Web 2 era, where ordinary users are the main producers of content - but technically, they don't own their content and their data. The vision of Web 3 is that of an Internet where the concepts of ownership and identity are first-class citizens. This is achieved, in part, by decentralization and giving people the capability not only to easily produce content, but also to easily host their own platforms which can, in turn, host content.

The way we consume content in Web 2 is reactive: our news feeds are personalized by algorithms and locked with proprietary platforms - you can't see your YouTube and Instagram feed merged into one, for example.

Having access to relevant, high-quality information, having control over what information you consume and how it is organized - is crucial, as it opens you to opportunities and allows you to avoid echo chambers (to the extent possible while exercising critical thinking while curating your feed).

In this article, I described how the Web 3 paradigm can be utilized to build your own integrated news feed.

We've seen how RSS is instrumental to engineering such a feed, and how its decreased adoption over time means that we also need a bridge to outlets that do not have RSS implemented.

As a result, we got a news feed, accessible everywhere, with a technical support for lots of major outlets and social networks (to the extent legally permissible by each platform's ToS), a feed that is anonymized (meaning no algorithm) and curated by us (by the means of categorization, labelling, inclusion and exclusion of streams).

Such a self-hosted feed can become one's single place to go when trying to answer the question, "what's new", whether in their professional life, hobby or a local community.

And, if you found this article useful, you could consider subscribing the the RSS feed of my blog ;)
