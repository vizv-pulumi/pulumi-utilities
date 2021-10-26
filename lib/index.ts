import * as pulumi from '@pulumi/pulumi'
import * as hacks from '@vizv/pulumi-workarounds'

export const heredoc = (
  literals: TemplateStringsArray,
  ...outputs: pulumi.Input<any>[]
) =>
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

export class OrganizationStackReference extends pulumi.StackReference {
  constructor(project: string, stack: string = pulumi.getStack()) {
    super(`${hacks.getOrganization()}/${project}/${stack}`)
  }
}
