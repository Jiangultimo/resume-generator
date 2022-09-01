import React, { useEffect } from 'react'
import * as d3 from 'd3'
import d3Cloud from 'd3-cloud'

interface Props {
  rectInfo: {
    width: number,
    height: number
  }
  words: string[]
}

const WORDS = ['React', 'Hooks', 'Node', 'TypeScript', 'Fabric', 'Bull', 'Vue', 'Mbox', 'Nuxt', 'Next', 'jQuery', 'Smarty', 'Nunjucks']

const WordCloud: React.FC<Props> = props => {
  const { rectInfo, words } = props
  const { width, height } = rectInfo

  useEffect(() => {
    if (words.length === 0 || !words || rectInfo.width === 0 || rectInfo.height === 0) {
      return
    }
    const wordCloud = (selector: string) => {
      const fill = d3.scaleOrdinal(d3.schemeCategory10)
      const svg = d3.select(selector).append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)

      const draw = (words: string[]) => {
        const cloud = svg.selectAll('g text')
          .data(words, d => d.text)
        cloud.enter()
          .append('text')
          .style('fill', (d, i) => fill(String(i)))
          .attr('text-anchor', 'middle')
          .attr('font-size', 1)
          .text(d => d.text)

        cloud.transition()
          .duration(600)
          .style('font-size', d => `${d.size}px`)
          .attr('transform', d => {
            return `translate(${[d.x, d.y]})rotate(${d.rotate})`
          })
          .style('fill-opacity', 1)

        cloud.exit()
          .transition()
          .duration(200)
          .style('fill-opacity', 1e-6)
          .attr('font-size', 1)
          .remove()
      }

      return {
        update: words => {
          d3Cloud().size([500, 500])
            .words(words)
            .padding(5)
            .rotate(() => ~~(Math.random() * 2) * 90)
            .font('Quicksand')
            .fontSize(d => d.size)
            .on('end', draw)
            .start()
        }
      }
    }

    const getWords = () => {
      return words.map(word => {
        return {
          text: word,
          size: 10 + Math.random() * 10
        }
      })
      // return words[i]
      //   .replace(/[!\.,:;\?]/g, '')
      //   .split(' ')
      //   .map(d => {
      //     console.log(d)
      //     return { text: d, size: 10 + Math.random() * 60}
      //   })
    }

    const showNewWords = vis => {
      vis.update(getWords())
      setTimeout(() => {
        showNewWords(vis)
      }, 2000)
    }

    const myWorldCloud = wordCloud('#wordCloud')
    showNewWords(myWorldCloud)
  }, [height, rectInfo.height, rectInfo.width, width, words])


  return <div id="wordCloud" className="absolute top-0 left-0" />
}

export default WordCloud
