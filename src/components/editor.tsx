// @ts-nocheck
'use client'

import EditorJS from '@editorjs/editorjs'
import { useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import '@/styles/editor.css'

export default function Editor() {
  const ref = useRef<EditorJS>()

  const inizilizeEditor = async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const Table = (await import('@editorjs/table')).default

    if (!ref.current) {
      ref.current = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          table: Table,
        },
      })
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      inizilizeEditor()

      return () => {
        if (ref.current) {
          ref.current.destroy()
        }
      }
    }
  }, [])

  const save = () => {
    if (ref.current) {
      ref.current.save().then((outputData) => {
        console.log('Article data: ', outputData)
      })
    }
  }

  return (
    <>
      {/* <div
        id='editorjs'
        className='prose max-w-full min-h-screen w-full'
      />
      <button onClick={save} className='btn btn-primary text-black'>
        Save
      </button> */}

      <div className='w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200'>
        {/* <form
          // id='subreddit-post-form'
          className='w-fit'
          // onSubmit={handleSubmit(onSubmit)}
        > */}
          <div className='prose prose-stone dark:prose-invert'>
            {/* <TextareaAutosize
              ref={(e) => {
                titleRef(e)
                // @ts-ignore
                _titleRef.current = e
              }}
              {...rest}
              placeholder='Title'
              className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
            /> */}
            <div id='editorjs' className='min-h-[500px]' />
            <p className='text-sm text-gray-500'>
              Use{' '}
              <kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>
                Tab
              </kbd>{' '}
              to open the command menu.
            </p>
          </div>
        {/* </form> */}
      </div>
    </>
  )
}
