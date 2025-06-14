import { ModelRole } from "@continuedev/config-yaml";
import { ModelDescription } from "core";
import { useAuth } from "../../../../context/Auth";
import { useTranslation } from "../../../../i18n/I18nContext";
import ModelRoleSelector from "../../../../pages/config/ModelRoleSelector";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { updateSelectedModelByRole } from "../../../../redux/thunks";
import { isJetBrains } from "../../../../util";

export function ModelsSection() {
  const { t } = useTranslation();
  const { selectedProfile } = useAuth();
  const dispatch = useAppDispatch();

  const config = useAppSelector((state) => state.config.config);
  const jetbrains = isJetBrains();

  function handleRoleUpdate(role: ModelRole, model: ModelDescription | null) {
    if (!model) {
      return;
    }

    void dispatch(
      updateSelectedModelByRole({
        role,
        selectedProfile,
        modelTitle: model.title,
      }),
    );
  }

  return (
    <div>
      <div className="text-[${getFontSize() - 1}px] grid grid-cols-1 gap-x-2 gap-y-1 sm:grid-cols-[auto_1fr]">
        <ModelRoleSelector
          displayName={t("Chat")}
          description={t("Used in the chat interface")}
          models={config.modelsByRole.chat}
          selectedModel={config.selectedModelByRole.chat}
          onSelect={(model) => handleRoleUpdate("chat", model)}
          setupURL="https://docs.continue.dev/chat/model-setup"
        />
        <ModelRoleSelector
          displayName={t("Autocomplete")}
          description={t("Used to generate code completion suggestions")}
          models={config.modelsByRole.autocomplete}
          selectedModel={config.selectedModelByRole.autocomplete}
          onSelect={(model) => handleRoleUpdate("autocomplete", model)}
          setupURL="https://docs.continue.dev/autocomplete/model-setup"
        />
        {/* Jetbrains has a model selector inline */}
        {!jetbrains && (
          <ModelRoleSelector
            displayName={t("Edit")}
            description={t("Used for inline edits")}
            models={config.modelsByRole.edit}
            selectedModel={config.selectedModelByRole.edit}
            onSelect={(model) => handleRoleUpdate("edit", model)}
            setupURL="https://docs.continue.dev/edit/model-setup"
          />
        )}
        <ModelRoleSelector
          displayName={t("Apply")}
          description={t("Used to apply generated codeblocks to files")}
          models={config.modelsByRole.apply}
          selectedModel={config.selectedModelByRole.apply}
          onSelect={(model) => handleRoleUpdate("apply", model)}
          setupURL="https://docs.continue.dev/customize/model-roles/apply"
        />
        <ModelRoleSelector
          displayName={t("Embed")}
          description={t(
            "Used to generate and query embeddings for the @codebase and @docs context providers",
          )}
          models={config.modelsByRole.embed}
          selectedModel={config.selectedModelByRole.embed}
          onSelect={(model) => handleRoleUpdate("embed", model)}
          setupURL="https://docs.continue.dev/customize/model-roles/embeddings"
        />
        <ModelRoleSelector
          displayName={t("Rerank")}
          description={t(
            "Used for reranking results from the @codebase and @docs context providers",
          )}
          models={config.modelsByRole.rerank}
          selectedModel={config.selectedModelByRole.rerank}
          onSelect={(model) => handleRoleUpdate("rerank", model)}
          setupURL="https://docs.continue.dev/customize/model-roles/reranking"
        />
      </div>
    </div>
  );
}
