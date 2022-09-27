import type { NextPage } from 'next'
import Layout from 'components/Layout'
import React, { useCallback, useRef } from 'react'
import { useState } from 'react'
import { Box, Button, Flex, Icon, PopUp, Stack, Text } from '@zoralabs/zord'
import { filters } from 'styles/styles.css'
import { DEFAULT_FILTER_OPTIONS } from '../utils/constants'
import { filterWrapper } from '../styles/styles.css'
import { SWRConfig, unstable_serialize } from 'swr'
import { GET_NEW_DROPS } from 'gql/queries'
import { DropList, dropsFetcher } from '../hooks/useInfiniteScroll'
import { GET_FREE_DROPS } from '../gql/queries'
import Feed from 'components/Feed'

export enum EditionFilterTypes {
  ALL = 'ALL',
  FREE = 'FREE',
}

export enum SortTypes {
  LATEST = 'Latest',
  OLDEST = 'Earliest',
  ENDING_SOON = 'Ending Soon',
  RECENTLY_ACTIVE = 'Recently Active',
}

export async function getStaticProps() {
  const erc721Drops = await dropsFetcher(GET_NEW_DROPS, 24, 0, 0)
  console.log('fallback drops:', erc721Drops)
  return {
    props: {
      fallback: {
        // unstable_serialize() array style key
        [unstable_serialize([GET_NEW_DROPS, 24, 0, 0])]: erc721Drops,
      },
    },
  }
}

const Home = ({ fallback }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [dropdownEnabled, setDropdownEnabled] = useState<boolean>(true)
  const [filter, setFilter] = useState<EditionFilterTypes>(EditionFilterTypes.ALL)
  const [sorting, setSorting] = useState<SortTypes>(SortTypes.LATEST)

  const openDropdown = useCallback(() => dropdownEnabled && setOpen(true), [dropdownEnabled])

  return (
    <SWRConfig value={{ fallback }}>
      <Layout>
        <Box className={filterWrapper}>
          <PopUp
            padding='x2'
            triggerClassName={filters}
            trigger={
              <Button
                variant='secondary'
                borderRadius='phat'
                size='sm'
                icon='ChevronDown'
                onClick={() => openDropdown}
                className={['sort-dropdown', filterWrapper]}
              >
                {filter}
              </Button>
            }
          >
            <Stack aria-label='Sort Dropdown' w='x64'>
              {DEFAULT_FILTER_OPTIONS.map((option) => (
                <Button
                  variant='ghost'
                  w='100%'
                  display='flex'
                  justify='space-between'
                  style={{
                    whiteSpace: 'nowrap',
                  }}
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                >
                  <Text as='span' pr='x10'>
                    {option.label}
                  </Text>
                  {option.value === filter && <Icon id='Plus' size='sm' />}
                </Button>
              ))}
            </Stack>
          </PopUp>
        </Box>
        {filter === EditionFilterTypes.FREE ? (
          <Feed filter={GET_FREE_DROPS} sorting={sorting} />
        ) : (
          <Feed filter={GET_NEW_DROPS} sorting={sorting} />
        )}
      </Layout>
    </SWRConfig>
  )
}

export default Home
