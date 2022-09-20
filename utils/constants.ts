import { EditionFilterTypes } from "./types"
import { BigNumber } from 'ethers'

// FETCH LIMIT
export const LIMIT = 24


// Sort options
export const LATEST = 'Latest'
export const OLDEST = 'Earliest'
export const ALL = 'All'
export const FREE = 'Free'
export const RECENTLY_TRADED = 'Recently traded'
export const DEFAULT_SORTING_OPTIONS = [
  LATEST,
  OLDEST,
]
export const DEFAULT_FILTER_OPTIONS = [
  { label: 'All', value: EditionFilterTypes.ALL },
  { label: 'Free', value: EditionFilterTypes.FREE }
]

export const dateOptions: [string, Intl.DateTimeFormatOptions] = [
  'en-au',
  {
    hour: 'numeric',
    minute: 'numeric',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  },
]


export const MAX_UINT64 = BigNumber.from('18446744073709551615')
export const MAX_UINT32 = BigNumber.from('4294967295')
export const OPEN_EDITION_SIZE = 1000000