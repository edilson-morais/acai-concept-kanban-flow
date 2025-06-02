export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      adriana_producoes: {
        Row: {
          data_atualizacao: string
          data_criacao: string
          descricao: string | null
          id: string
          legenda_gpt: string | null
          status: string
          titulo: string
          url_imagem: string | null
          url_video: string | null
        }
        Insert: {
          data_atualizacao?: string
          data_criacao?: string
          descricao?: string | null
          id?: string
          legenda_gpt?: string | null
          status?: string
          titulo: string
          url_imagem?: string | null
          url_video?: string | null
        }
        Update: {
          data_atualizacao?: string
          data_criacao?: string
          descricao?: string | null
          id?: string
          legenda_gpt?: string | null
          status?: string
          titulo?: string
          url_imagem?: string | null
          url_video?: string | null
        }
        Relationships: []
      }
      categorias: {
        Row: {
          ativo: boolean | null
          cor: string | null
          created_at: string | null
          descricao: string | null
          id: string
          nome: string
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome: string
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      clientes: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          data_nascimento: string | null
          email: string | null
          endereco: string | null
          id: string
          nome: string
          telefone: string | null
          total_pedidos: number | null
          ultimo_pedido: string | null
          updated_at: string | null
          valor_total_gasto: number | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome: string
          telefone?: string | null
          total_pedidos?: number | null
          ultimo_pedido?: string | null
          updated_at?: string | null
          valor_total_gasto?: number | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          telefone?: string | null
          total_pedidos?: number | null
          ultimo_pedido?: string | null
          updated_at?: string | null
          valor_total_gasto?: number | null
        }
        Relationships: []
      }
      configuracoes: {
        Row: {
          chave: string
          descricao: string | null
          id: string
          tipo: string | null
          updated_at: string | null
          valor: string | null
        }
        Insert: {
          chave: string
          descricao?: string | null
          id?: string
          tipo?: string | null
          updated_at?: string | null
          valor?: string | null
        }
        Update: {
          chave?: string
          descricao?: string | null
          id?: string
          tipo?: string | null
          updated_at?: string | null
          valor?: string | null
        }
        Relationships: []
      }
      itens_pedido: {
        Row: {
          created_at: string | null
          id: string
          observacoes: string | null
          pedido_id: string | null
          preco_unitario: number
          produto_id: string | null
          quantidade: number
          subtotal: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          observacoes?: string | null
          pedido_id?: string | null
          preco_unitario: number
          produto_id?: string | null
          quantidade?: number
          subtotal: number
        }
        Update: {
          created_at?: string | null
          id?: string
          observacoes?: string | null
          pedido_id?: string | null
          preco_unitario?: number
          produto_id?: string | null
          quantidade?: number
          subtotal?: number
        }
        Relationships: [
          {
            foreignKeyName: "itens_pedido_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itens_pedido_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      pagamentos: {
        Row: {
          created_at: string | null
          data_pagamento: string | null
          id: string
          metodo: Database["public"]["Enums"]["metodo_pagamento"]
          observacoes: string | null
          pedido_id: string | null
          status: string | null
          troco: number | null
          valor: number
        }
        Insert: {
          created_at?: string | null
          data_pagamento?: string | null
          id?: string
          metodo: Database["public"]["Enums"]["metodo_pagamento"]
          observacoes?: string | null
          pedido_id?: string | null
          status?: string | null
          troco?: number | null
          valor: number
        }
        Update: {
          created_at?: string | null
          data_pagamento?: string | null
          id?: string
          metodo?: Database["public"]["Enums"]["metodo_pagamento"]
          observacoes?: string | null
          pedido_id?: string | null
          status?: string | null
          troco?: number | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamentos_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos: {
        Row: {
          cliente_id: string | null
          created_at: string | null
          data_entrega_prevista: string | null
          data_entrega_real: string | null
          desconto: number | null
          endereco_entrega: string | null
          id: string
          numero_pedido: number
          observacoes: string | null
          status: Database["public"]["Enums"]["status_pedido"] | null
          subtotal: number | null
          tipo_entrega: string | null
          total: number | null
          updated_at: string | null
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string | null
          data_entrega_prevista?: string | null
          data_entrega_real?: string | null
          desconto?: number | null
          endereco_entrega?: string | null
          id?: string
          numero_pedido?: number
          observacoes?: string | null
          status?: Database["public"]["Enums"]["status_pedido"] | null
          subtotal?: number | null
          tipo_entrega?: string | null
          total?: number | null
          updated_at?: string | null
        }
        Update: {
          cliente_id?: string | null
          created_at?: string | null
          data_entrega_prevista?: string | null
          data_entrega_real?: string | null
          desconto?: number | null
          endereco_entrega?: string | null
          id?: string
          numero_pedido?: number
          observacoes?: string | null
          status?: Database["public"]["Enums"]["status_pedido"] | null
          subtotal?: number | null
          tipo_entrega?: string | null
          total?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      "posts_agendados-dash": {
        Row: {
          criado_em: string | null
          data_agendada: string | null
          id: string
          legenda: string | null
          status: string | null
          tipo_midia: string | null
          url_arquivo: string | null
        }
        Insert: {
          criado_em?: string | null
          data_agendada?: string | null
          id?: string
          legenda?: string | null
          status?: string | null
          tipo_midia?: string | null
          url_arquivo?: string | null
        }
        Update: {
          criado_em?: string | null
          data_agendada?: string | null
          id?: string
          legenda?: string | null
          status?: string | null
          tipo_midia?: string | null
          url_arquivo?: string | null
        }
        Relationships: []
      }
      produtos: {
        Row: {
          categoria_id: string | null
          created_at: string | null
          descricao: string | null
          disponivel: boolean | null
          estoque_atual: number | null
          estoque_minimo: number | null
          id: string
          imagem_url: string | null
          nome: string
          preco: number
          tipo: Database["public"]["Enums"]["tipo_produto"]
          updated_at: string | null
        }
        Insert: {
          categoria_id?: string | null
          created_at?: string | null
          descricao?: string | null
          disponivel?: boolean | null
          estoque_atual?: number | null
          estoque_minimo?: number | null
          id?: string
          imagem_url?: string | null
          nome: string
          preco?: number
          tipo?: Database["public"]["Enums"]["tipo_produto"]
          updated_at?: string | null
        }
        Update: {
          categoria_id?: string | null
          created_at?: string | null
          descricao?: string | null
          disponivel?: boolean | null
          estoque_atual?: number | null
          estoque_minimo?: number | null
          id?: string
          imagem_url?: string | null
          nome?: string
          preco?: number
          tipo?: Database["public"]["Enums"]["tipo_produto"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "produtos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      metodo_pagamento:
        | "dinheiro"
        | "pix"
        | "cartao_debito"
        | "cartao_credito"
        | "vale_refeicao"
      status_pedido: "NOVO" | "EM_PREPARO" | "PRONTO" | "FINALIZADO"
      tipo_produto: "acai" | "complemento" | "bebida" | "adicional"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      metodo_pagamento: [
        "dinheiro",
        "pix",
        "cartao_debito",
        "cartao_credito",
        "vale_refeicao",
      ],
      status_pedido: ["NOVO", "EM_PREPARO", "PRONTO", "FINALIZADO"],
      tipo_produto: ["acai", "complemento", "bebida", "adicional"],
    },
  },
} as const
