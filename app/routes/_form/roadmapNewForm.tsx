import {TextInput} from "~/routes/_unit/_form/TextInput";
import {FormProps, FormState, StyledForm} from "~/mui/StyledForm";
import {roadmap} from "~/client/roadmap";
import {redirect} from "@remix-run/router";
import {StyledButton} from "~/mui/StyledButton";
import {Request} from "@remix-run/web-fetch";
import {util} from "~/util";

export namespace RoadmapNewFormNs {
  export async function action(request: Request) {
    const formData = await request.formData().catch(reason => {
      return FormState.error({form: util.createErrorMessage(reason)})
    })
    if (formData instanceof Response) return formData
    const title = formData.get("title")
    if (typeof title != "string") return FormState.error({title: "タイトルを入力してください"})

    return await roadmap.post({title: title}).then(value => {
      if (value.error) {
        return FormState.error({form: value.error.error_id + ", " + value.error.message});
      }
      return redirect(`/roadmap/${value.value.id}`)
    }).catch(reason => {
      return FormState.error({form: util.createErrorMessage(reason)})
    })
  }
}

export function RoadmapNewForm<T extends (({request}: { request: Request }) => Promise<Response>)>(
  {
    ...props
  }: RoadmapNewFormProps,
) {

  return (
    <StyledForm<T> {...props}>
      <TextInput label={"title"}/>
      <StyledButton type="submit">
        作成
      </StyledButton>
    </StyledForm>
  )
}

export interface RoadmapNewFormProps extends FormProps {
  // actionプロパティを外のファイルにあるRoadmapNewFormPropsコンポーンで使えるよう試みる→できてない
  action: (request: Request) => Promise<Response>;
}
