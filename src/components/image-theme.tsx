import {cn} from '@/lib/utils'
import Image from 'next/image'
import type {ImageProps} from 'next/image'

type ImageThemeProps = ImageProps & {srcInverse: string}

export default function ImageTheme(props: ImageThemeProps) {
  const {src, srcInverse, className, ...rest} = props

  return (
    <>
      <Image
        src={src}
        {...rest}
        className={cn(className, 'hidden dark:block')}
        alt=""
      />
      <Image
        src={srcInverse}
        {...rest}
        className={cn(className, 'block dark:hidden')}
        alt=""
      />
    </>
  )
  //return <Image {...rest} src={srcDetected} />
}
