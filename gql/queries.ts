import { gql } from 'graphql-request';

const ERC721_DROP_FRAGMENT = gql`
  fragment ERC721Fields on ERC721Drop {
    createdAt
    creator
    address
    name
    symbol
    contractConfig {
      editionSize
    }
    editionMetadata {
      imageURI
      contractURI
      description
    }
    salesConfig {
      publicSalePrice
      publicSaleStart
      publicSaleEnd
    }
    totalMinted
    maxSupply
  }
`


export const GET_NEW_DROPS = gql`
  query AllERC721Drops($limit: Int, $offset: Int) {
    erc721Drops(
      orderBy: createdAt
      orderDirection: desc
      first: $limit
      skip: $offset
    ) {
     ...ERC721Fields
    }
  }

  ${ERC721_DROP_FRAGMENT}
`;

export const GET_FREE_DROPS = gql`
  query FreeERC721Drops($limit: Int, $offset: Int, $orderDirection: String) {
    erc721Drops(
      orderBy: createdAt
      orderDirection: desc
      first: $limit
      skip: $offset
      where: {salesConfig_: {publicSalePrice: "0"}}
    ) {
      ...ERC721Fields
    }
  }

    ${ERC721_DROP_FRAGMENT}
  `