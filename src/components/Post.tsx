import React, { type ReactElement } from 'react'
import styled from 'styled-components'

const PostContainer = styled.div`
text-justify: newspaper;
text-align: justify;
`
export function Post (): ReactElement {
  return (
    <PostContainer>
      <div>
        <h3>Getting Started with MySQL: A Beginners Guide</h3>
        <h6>03-09-2024 11:03:11</h6>
      </div>
      <hr></hr>
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde earum laborum eaque quia quasi iusto laudantium voluptas dolores, impedit, tempore fugiat? Magni in rerum omnis fugit eos iste hic nemo!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde earum laborum eaque quia quasi iusto laudantium voluptas dolores, impedit, tempore fugiat? Magni in rerum omnis fugit eos iste hic nemo!</p>
      </div>
    </PostContainer>
  )
}

export default Post
