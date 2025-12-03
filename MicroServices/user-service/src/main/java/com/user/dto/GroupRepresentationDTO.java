package com.user.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Data
public class GroupRepresentationDTO implements Serializable {
    protected String id;
    protected String name;
    protected String path;
    protected String parentId;
    protected Long subGroupCount;
    protected List<GroupRepresentationDTO> subGroups;
    protected Map<String, List<String>> attributes;
    protected List<String> realmRoles;
    protected Map<String, List<String>> clientRoles;
    private Map<String, Boolean> access;
}
