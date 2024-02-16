import { PortableText, PortableTextProps } from '@portabletext/react'
import ImageListComponent from './ImageListComponent'

function RichTextRenderer(props: PortableTextProps) {
  return (
    <div className='prose prose-invert select-text'>
      <PortableText {...props} components={{
        types: {
          asset: (props) => <ImageListComponent value={{ images: [props.value] }} />,
          imageList: ImageListComponent
        }
      }} />
    </div>
  )
}

export default RichTextRenderer
