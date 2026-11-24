import { MessagesSquare } from 'lucide-react'
import { PanelPlaceholder } from './panel-placeholder'

// Placeholder for the WhatsApp inbox (served by the bot module of api_american_glass).
export function ConversationsView() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PanelPlaceholder
        icon={MessagesSquare}
        title="Conversaciones de WhatsApp"
        description="Pronto vas a poder ver y responder acá los mensajes que llegan por WhatsApp."
      />
    </div>
  )
}
