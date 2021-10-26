import * as pulumi from '@pulumi/pulumi'

export const heredoc = (literals: TemplateStringsArray, ...outputs: pulumi.Input<any>[]) =>
  pulumi.all(outputs).apply((placeholders) =>
    literals
      .slice(1)
      .reduce<String>(
        (result, token, i) => result + String(placeholders[i]) + token,
        literals[0],
      )
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .join('\n'),
  )
