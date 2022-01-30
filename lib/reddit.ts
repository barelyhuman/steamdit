import got from 'got'

const REDDIT_API_ROOT_URL = 'https://www.reddit.com/'

type Images = {
	id: string
	source: {url: string}
	resolutions: any[]
	variants: {
		gif: {source: {url: string}}
		mp4: {source: {url: string}}
	}
}
type Preview = {
	enabled: boolean
	images: Images[]
}

type Listing = {
	data: {
		id: string
		title: string
		author: string
		permalink: string
		preview?: Preview
	}
}

export type DigestedListing = {
	id: string
	title: string
	author: string
	permalink: string
	preview: Array<{url: string}>
}

const getGif = (preview: Images) => preview?.variants?.gif || false

export async function getHot() {
	const url = `${REDDIT_API_ROOT_URL}hot/.json`
	const data = await got
		.get(url, {
			headers: {
				'User-Agent': 'steamdit-client/minimal reddit hot page',
			},
		})
		.then((data) => JSON.parse(data.body))

	const digested: DigestedListing[] = data.data.children.map(
		(listing: Listing) => {
			let preview: Array<{url: string}> = []
			if (listing.data.preview && listing.data.preview?.images.length > 0) {
				preview = listing.data.preview?.images.map((x: Images) => {
					const hasGif = getGif(x)
					if (hasGif) {
						return {
							url: hasGif.source.url.replace(/amp;/g, ''),
						}
					}

					return {url: x.source.url.replace(/amp;/g, '')}
				})
			}

			return {
				id: listing.data.id,
				title: listing.data.title,
				author: listing.data.author,
				permalink:
					REDDIT_API_ROOT_URL +
					(listing.data.permalink.startsWith('/') &&
						listing.data.permalink.slice(1)),
				preview,
			}
		}
	)

	return digested
}
