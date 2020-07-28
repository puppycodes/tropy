'use strict'

const presets = [
  '@babel/preset-react'
]

const plugins = [
  '@babel/plugin-syntax-class-properties'
]

if (process.env.COVERAGE)
  plugins.push(['istanbul', {
    include: ['src/**/*.js']
  }])

require('@babel/register')({
  presets,
  plugins
})
