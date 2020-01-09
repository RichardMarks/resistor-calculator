const calculator = {
  series (values) {
    const steps = []
    const totalR = values.reduce((t, n) => {
      steps.push(`${t.toFixed(4)} + ${n.toFixed(4)}`)
      return t + n
    }, 0)
    steps.push(` = ${totalR.toFixed(4)}`)
    return [ totalR, steps ]
  },

  parallel (values) {
    const steps = ['1 / {']
    const totalR = values.reduce((t, n) => {
      steps.push(`${t.toFixed(4)} + ${(1 / n).toFixed(4)}`)
      return t + (1 / n)
    }, 0)
    steps.push(`} = ${totalR.toFixed(4)}`)
    return [ totalR, steps ]
  }
}

export default calculator
