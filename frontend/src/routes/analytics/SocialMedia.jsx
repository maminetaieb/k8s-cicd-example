import React from 'react'
import {
  InstagramSingleDataSection,
  InstagramCommentsByTime,
  InstagramLikesByTime,
  InstagramPostsByType,
  InstagramVideoViewsByTime,
} from '../../components/analytics'
import { Section } from '../../components/modelView'

export const SocialMedia = () => {
  return (
    <div className="h-full flex flex-col items-center justify-start w-full p-4 space-y-4">
      <div className="flex items-center text-2xl text-secondary font-semibold self-start">
        Social Media Analytics
      </div>
      <div className="w-full flex flex-col items-center md:flex-row md:justify-evenly md:items-start space-x-2 space-y-2">
        <div className="w-full flex flex-col items-center">
          <Section title="General Statistics">
            <InstagramSingleDataSection />
          </Section>
          <Section title="Graphs & Visualizations">
            <div className="space-y-5 p-2">
              <InstagramLikesByTime />
              <InstagramPostsByType />
              <InstagramCommentsByTime />
              <InstagramVideoViewsByTime />
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}
