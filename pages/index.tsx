import Head from 'next/head'
import useSWR from 'swr'
import type {DigestedListing} from 'lib/reddit'
import Box from '@zincui/box'
import Loader from '@zincui/loader'

const fetcher = async (url: string) =>
	fetch(url).then(async (res) => {
		if (res.ok) {
			return (await res.json()).data
		}

		return Promise.reject(res)
	})

export default function Home() {
	const {data, error} = useSWR('/api/hot', fetcher)

	if (error) {
		console.error(error)
		return <>Failed to fetch...</>
	}

	if (!data) {
		return (
			<Box padding-16 flex column className="mx-auto max-w-max">
				<Header />
				<Box flex center>
					<Loader
						flex
						delay={150}
						success={false}
						error={false}
						size="1em"
						className=""
					/>
				</Box>
			</Box>
		)
	}

	return (
		<>
			<Head>
				<title>Steamdit</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box padding-16 className="mx-auto max-w-max">
				<Header />
				<main>
					{data.map((listing: DigestedListing) => (
						<Box
							margin-8
							padding-12
							key={listing.id}
							className="rounded-lg bg-surface"
						>
							<a
								href={listing.permalink}
								className="text-subtle hover:text-text"
							>
								<p>{listing.title}</p>
							</a>
							<p className="text-muted">by {listing.author}</p>
							<Box marginY-8>
								{(listing.preview || []).map((preview) => (
									<img height="200" className="w-max" src={preview.url} />
								))}
							</Box>
						</Box>
					))}
				</main>
			</Box>
		</>
	)
}

const Header = () => (
	<Box flex center column marginX-8 marginY-16>
		<h1 className="text-3xl font-bold">Steamdit</h1>
		<p className="font-base text-muted">the lighter reddit</p>
	</Box>
)
