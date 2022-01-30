import type {NextApiRequest, NextApiResponse} from 'next'

import {DigestedListing, getHot} from 'lib/reddit'

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse<{data: DigestedListing[]}>
) {
	const data = await getHot()
	response.status(200).json({data})
}
