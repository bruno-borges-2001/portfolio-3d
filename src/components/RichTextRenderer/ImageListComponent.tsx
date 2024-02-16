import { IAsset } from "@/types/components"
import { urlForImage } from "../../../sanity/lib/image"
import ImageComponent from "../ImageComponent"

function ImageListComponent(props: { value: { images: IAsset[] } }) {
  return (
    <div className='w-full min-h-[250px] max-h-[250px] flex flex-wrap gap-4 relative items-center justify-center'>
      {props.value.images.map(el => {
        const image = urlForImage(el.image)

        return <ImageComponent
          src={image}
          key={image}
          alt={el.alt}
          width={0}
          height={0}
          sizes="100vw"
          style={{ height: '100%', width: 'auto', maxHeight: 250 }}
          priority
        />
      })}
    </div>
  )
}

export default ImageListComponent
