export const projectSummaryQuery =
  'SELECT\
      jsonb_build_object(\
        \'id\', document_id,\
        \'name\', document_name\
      ) as document,\
      jsonb_agg(\
        jsonb_build_object(\
          \'tag\', jsonb_build_object(\
            \'id\', tag_id,\
            \'title\', tag_title\
          ),\
          \'count\', paragraps_count\
        )\
      ) as tags\
      FROM (SELECT\
        documents.id as document_id,\
        documents.name as document_name,\
        tags.id AS tag_id,\
        tags.title AS tag_title,\
        COUNT(paragraphs.id) as paragraps_count\
      FROM documents\
      full outer join "tags" on "tags"."project_id" = "documents"."project_id"\
      left join "paragraph-tags" on "paragraph-tags"."tag_id" = "tags"."id"\
      left join "paragraphs" on ("paragraphs"."id" = "paragraph-tags"."paragraph_id" and (documents.id = paragraphs.document_id OR "paragraph-tags".id IS NULL))\
      where "documents"."project_id" = $1\
      group by documents.id, tags.id) t\
      group by document_id, document_name;';
