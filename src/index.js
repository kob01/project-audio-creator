import React from 'react'
import ReactDOM from 'react-dom'

import Layout from './View.Layout'

import { resizePage } from './utils.common'

import './index.css'

import icon from '../static/icon.png'

const link = document.createElement('link')
link.rel = 'icon'
link.href = icon
document.head.append(link)

resizePage()

ReactDOM.render(<Layout />, document.getElementById('root'))