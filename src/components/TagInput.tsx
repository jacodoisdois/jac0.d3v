import React, { useState } from 'react'
import styled from 'styled-components'

interface TagInputProps {
  onTagsChange: (tags: string[]) => void
  className: string
}

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 8px 3px;
  border: none;
  border-bottom: 1px solid #c9d7d0;
  background-color: #1b2127;
  color: #f1f7f3;
  box-shadow: none;
  font-family: 'Press Start 2P', Arial;
  transition: none;
  width: 300px;
  font-size: 0.7em;

  &:focus {
    outline: none;
  }
`

const InputTitle = styled.p`
font-size: 0.8em;
`

const TagInput: React.FC<TagInputProps> = ({ onTagsChange, className }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === ' ' && inputValue.trim() !== '' && tags.length <= 6) {
      setTags([...tags, inputValue.trim()])
      setInputValue('')
      onTagsChange([...tags, inputValue.trim()])
    }
  }

  const removeTag = (tag: string): void => {
    const newTags = tags.filter(t => t !== tag)
    setTags(newTags)
    onTagsChange(newTags)
  }

  return (
    <div className={className}>
      <InputTitle>Tags:</InputTitle>
      <InputField
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Press space to add tags"
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tags.map((tag, index) => (
          <div key={index} style={{ backgroundColor: '#333', color: '#fff', padding: '3px', marginRight: '5px', borderRadius: '5px', fontSize: '0.5em' }}>
            {tag}
            <span style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => { removeTag(tag) }}>x</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TagInput
