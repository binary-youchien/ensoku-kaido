import {TextInput} from "~/routes/_unit/_form/TextInput";
import {FormProps, FormState, StyledForm} from "~/mui/StyledForm";
import {RoadmapClient} from "~/client/roadmapClient";
import {redirect} from "@remix-run/router";
import {StyledButton} from "~/mui/StyledButton";
import {Request} from "@remix-run/web-fetch";
import {util} from "~/util";

export namespace RoadmapNewFormNs {
  export async function action(request: Request) {
    // console.debug("roadmap new form action: ",request)
    const formData = await request.formData().catch(reason => {
      console.debug("error: ", reason)
      return FormState.error({form: util.createErrorMessage(reason)})
    })
    if (formData instanceof Response) return formData
    const title = formData.get("title")
    console.debug("title: ", title)
    if (typeof title != "string") return FormState.error({title: "タイトルを入力してください"})

    return await RoadmapClient.post({title: title}).then(value => {
      if (value.error) {
        return FormState.error({form: value.error.error_id + ", " + value.error.message});
      }
      return redirect(`/roadmap/${value.value.id}/edit`)
    }).catch(reason => {
      console.debug("fetch error: ", reason)
      return FormState.error({form: util.createErrorMessage(reason)})
    })
  }
}

export function RoadmapNewForm(
  {
    ...props
  }: RoadmapNewFormProps,
) {

  return (
    <StyledForm {...props}>
      <TextInput label={"タイトル"} name={"title"}/>
      <StyledButton type="submit">
        作成
      </StyledButton>
    </StyledForm>
  )
}

export interface RoadmapNewFormProps extends FormProps {
}
